import { Link } from 'react-router-dom';
import { Star, Fuel, Users, Settings, MapPin, Shield, Car } from 'lucide-react';
import WishlistButton from './features/WishlistButton';

const typeConfig = {
  bike:   { label: 'Bike',   cls: 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-900/60 dark:text-primary-300 dark:border-primary-800/50' },
  scooty: { label: 'Scooty', cls: 'bg-accent-100 text-accent-700 border-accent-200 dark:bg-accent-900/60 dark:text-accent-300 dark:border-accent-800/50' },
  car:    { label: 'Car',    cls: 'bg-secondary-100 text-secondary-700 border-secondary-200 dark:bg-secondary-900/60 dark:text-secondary-300 dark:border-secondary-800/50' },
};

const VehicleCard = ({ vehicle }) => {
  const imageUrl = vehicle.images?.[0] || vehicle.image;
  const price = vehicle.price || vehicle.pricePerDay || 0;
  const type = typeConfig[vehicle.type] || typeConfig.car;

  return (
    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 rounded-3xl overflow-hidden shadow-elegant-md hover:shadow-elegant-xl hover:border-primary-400/30 dark:hover:border-primary-500/30 transition-all duration-300 flex flex-col relative group hover:-translate-y-2 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={vehicle.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="w-12 h-12 text-neutral-700" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${type.cls}`}>
            {type.label}
          </span>
        </div>

        {/* Wishlist */}
        <div className="absolute top-3 right-3">
          <WishlistButton vehicleId={vehicle.id} compact />
        </div>

        {/* Bottom badges */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            <div className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
            <span className="text-white text-xs font-medium">Available</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            <Shield className="w-3 h-3 text-accent-400" />
            <span className="text-white text-xs font-medium">Verified</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate mb-1">{vehicle.name}</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-secondary-400 fill-current" />
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{vehicle.rating}</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-500">({vehicle.reviews})</span>
              </div>
              {vehicle.location && (
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                  <MapPin className="w-3 h-3" />{vehicle.location}
                </div>
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">₹{price}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-500">per day</div>
          </div>
        </div>

        {/* Specs */}
        {vehicle.specs && (
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-neutral-200 dark:border-neutral-800 mb-4">
            {vehicle.specs.fuel && (
              <div className="text-center">
                <div className="w-7 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Fuel className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-500" />
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-500 mb-0.5">Fuel</div>
                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{vehicle.specs.fuel}</div>
              </div>
            )}
            {vehicle.specs.transmission && (
              <div className="text-center">
                <div className="w-7 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Settings className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-500" />
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-500 mb-0.5">Trans.</div>
                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{vehicle.specs.transmission}</div>
              </div>
            )}
            {vehicle.specs.seats && (
              <div className="text-center">
                <div className="w-7 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Users className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-500" />
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-500 mb-0.5">Seats</div>
                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{vehicle.specs.seats}</div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto relative z-30">
          <Link to={`/vehicles/${vehicle.id}`}
            className="flex-1 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold rounded-xl transition-all duration-200 text-center text-sm border border-neutral-200/60 dark:border-neutral-700/60 hover:border-neutral-300 dark:hover:border-neutral-600">
            Details
          </Link>
          <Link to={`/vehicles/${vehicle.id}?book=true`}
            className="flex-1 py-3 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 dark:from-neutral-100 dark:to-neutral-200 dark:hover:from-white dark:hover:to-neutral-100 text-white dark:text-neutral-900 font-bold rounded-xl transition-all duration-300 text-center text-sm shadow-elegant hover:shadow-elegant-lg transform hover:-translate-y-0.5">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
