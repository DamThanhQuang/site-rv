import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schema/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private productService: ProductService,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: string) {
    // Check if the product exists
    const product = await this.productService.findOne(
      createBookingDto.productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if the dates are valid
    if (createBookingDto.checkIn >= createBookingDto.checkOut) {
      throw new BadRequestException(
        'Check-in date must be before check-out date',
      );
    }

    // Check if the product is available for these dates
    const overlappingBookings = await this.bookingModel.find({
      productId: createBookingDto.productId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkIn: { $lte: createBookingDto.checkIn },
          checkOut: { $gt: createBookingDto.checkIn },
        },
        {
          checkIn: { $lt: createBookingDto.checkOut },
          checkOut: { $gte: createBookingDto.checkOut },
        },
        {
          checkIn: { $gte: createBookingDto.checkIn },
          checkOut: { $lte: createBookingDto.checkOut },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      throw new BadRequestException(
        'This property is not available for the selected dates',
      );
    }

    // Create the booking
    const newBooking = new this.bookingModel({
      ...createBookingDto,
      userId,
    });

    return newBooking.save();
  }

  async findAllByUser(userId: string) {
    return this.bookingModel.find({ userId }).sort({ createdAt: -1 });
  }

  async findOne(id: string, userId: string) {
    const booking = await this.bookingModel.findById(id);
    if (!booking) {
      throw new NotFoundException(`Booking not found`);
    }

    if (booking.userId.toString() !== userId) {
      throw new BadRequestException(
        'You do not have permission to view this booking',
      );
    }

    return booking;
  }

  async cancel(id: string, userId: string) {
    const booking = await this.findOne(id, userId);

    // Check if the booking can be cancelled (e.g., not already started)
    const currentDate = new Date();
    if (booking.checkIn <= currentDate) {
      throw new BadRequestException(
        'Cannot cancel a booking that has already started',
      );
    }

    booking.status = 'cancelled';
    return booking.save();
  }
}
