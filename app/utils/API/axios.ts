import $axios from "./APIBase";

export interface Car {
  id: string | number;
  name: string;
  year: number;
  description: string;
  image: string;
  images: string[];
  features: string[];
  make: string;
  model: string;
  color: string;
  color_hex: string;
  license_plate: string;
  fuel_type: string;
  transmission: string;
  seats: number;
  mileage: number;
  status: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

class apiService {
  // Get all cars for public display
  async getPublicCars(): Promise<Car[]> {
    try {
      const response = await $axios.get('/cars/public/');
      return response.data.map((car: any) => this.formatCarForFrontend(car));
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }

  // Get single car details
  async getCarById(id: string): Promise<Car> {
    try {
      const response = await $axios.get(`/cars/public/${id}/`);
      return this.formatCarForFrontend(response.data);
    } catch (error) {
      console.error('Error fetching car:', error);
      throw error;
    }
  }
  private formatCarForFrontend(car: any): Car {
    return {
      id: car.id,
      name: `${car.make} ${car.model}`,
      year: car.year,
      description: car.description,
    //   description: car.description || `${car.year} ${car.make} ${car.model} - ${car.color}`,
      image: car.images && car.images.length > 0 ? car.images[0] : '/default-car.jpg',
      images: car.images || [],
      features: car.features || [],
      make: car.make,
      model: car.model,
      color: car.color,
      color_hex: car.color_hex,
      license_plate: car.license_plate,
      fuel_type: car.fuel_type_display || car.fuel_type,
      transmission: car.transmission_display || car.transmission,
      seats: car.seats,
      mileage: car.mileage,
      status: car.status_display || car.status,
      // You can add a rental price calculation here or fetch from another endpoint
    };
  }
}

export default new apiService();
  // Format car data for frontend consumption