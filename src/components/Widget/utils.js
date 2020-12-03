const co2_today = 11; // t
const co2_model_low = 1; // t
const co2_model_high = 2.7; // t
const mobility_share = 23; // %
const days_per_week = 5;

const co2_perday_today = co2_today            / 100 * mobility_share / (52 * days_per_week) * 1000 * 1000; // gr
const co2_perday_model_low = co2_model_low    / 100 * mobility_share / (52 * days_per_week) * 1000 * 1000; // gr
const co2_perday_model_high = co2_model_high / 100 * mobility_share / (52 * days_per_week) * 1000 * 1000; // gr

const performance_2050_car = 10; // %
const performance_2050_ecar = 50; // %
const performance_2050_public = 30; // %

const multiplier_carmf = 1 / 2;
const multiplier_ecar = 1 / 2;
const multiplier_public = 1/ 2.63;

export const emiss = (base, value) => {
    return base * (base / value);
}

export const emissDistance = (type, distance) => {
    let multiplier = 1;
    const CO2PerKm = 250;
    if (type === 'car_mf') { multiplier = multiplier_carmf };
    if (type === 'ecar') { multiplier = multiplier_ecar };
    if (type === 'public') { multiplier = multiplier_public };
    return distance * (CO2PerKm * multiplier);
}

export const iso_definitions = {
  'car_2020':             emiss(co2_perday_today, co2_perday_today), // 9700
  'car_2050_min':         emiss(co2_perday_model_low, co2_perday_model_low  * (1 + (1 / (100 - performance_2050_car) * performance_2050_car))), // 990
  'car_2050_max':         emiss(co2_perday_model_high, co2_perday_model_high * (1 + (1 / (100 - performance_2050_car) * performance_2050_car))), // 2640
  'car_2050_bike_min':    emiss(co2_perday_model_low, co2_perday_model_low  * (1 + (1 / (100 - performance_2050_car) * performance_2050_car)) * 5 / 3), // 1650
  'car_2050_bike_max':    emiss(co2_perday_model_high, co2_perday_model_high * (1 + (1 / (100 - performance_2050_car) * performance_2050_car)) * 5 / 3), // 4400 

  'car_mf_2020':          emiss(co2_perday_today * multiplier_carmf, co2_perday_today * multiplier_carmf), // 19400
  'car_mf_2050_min':      emiss(co2_perday_model_low * multiplier_carmf, co2_perday_model_low * multiplier_carmf * (1 + (1 / (100 - performance_2050_car) * performance_2050_car))), // 1980
  'car_mf_2050_max':      emiss(co2_perday_model_high * multiplier_carmf, co2_perday_model_high * multiplier_carmf * (1 + (1 / (100 - performance_2050_car) * performance_2050_car))), // 5280
  'car_mf_2050_bike_min': emiss(co2_perday_model_low * multiplier_carmf, co2_perday_model_low *  multiplier_carmf * (1 + (1 / (100 - performance_2050_car) * performance_2050_car)) * 5 / 3), // 3300
  'car_mf_2050_bike_max': emiss(co2_perday_model_high * multiplier_carmf, co2_perday_model_high * multiplier_carmf * (1 + (1 / (100 - performance_2050_car) * performance_2050_car)) * 5 / 3), // 8800

  'ecar_2020':            emiss(co2_perday_today * multiplier_ecar, co2_perday_today * multiplier_ecar), // 19400
  'ecar_2050_min':        emiss(co2_perday_model_low  * multiplier_ecar, co2_perday_model_low  * multiplier_ecar * (1 + (1 / (100 - performance_2050_ecar) * performance_2050_ecar))), // 3600
  'ecar_2050_max':        emiss(co2_perday_model_high * multiplier_ecar, co2_perday_model_high * multiplier_ecar * (1 + (1 / (100 - performance_2050_ecar) * performance_2050_ecar))), // 9600
  'ecar_2050_bike_min':   emiss(co2_perday_model_low  * multiplier_ecar, co2_perday_model_low  * multiplier_ecar * (1 + (1 / (100 - performance_2050_ecar) * performance_2050_ecar)) * 5 / 3), // 6000
  'ecar_2050_bike_max':   emiss(co2_perday_model_high * multiplier_ecar, co2_perday_model_high * multiplier_ecar * (1 + (1 / (100 - performance_2050_ecar) * performance_2050_ecar)) * 5 / 3), // 16000

  'public_2020':          emiss(co2_perday_today * multiplier_public, co2_perday_today * multiplier_public), // 37830
  'public_2050_min':      emiss(co2_perday_model_low * multiplier_public, co2_perday_model_low * multiplier_public * (1 + (1 / (100 - performance_2050_public) * performance_2050_public))), // 5019
  'public_2050_max':      emiss(co2_perday_model_high * multiplier_public, co2_perday_model_high * multiplier_public * (1 + (1 / (100 - performance_2050_public) * performance_2050_public))), // 13384
  'public_2050_bike_min': emiss(co2_perday_model_low * multiplier_public, co2_perday_model_low  * multiplier_public * (1 + (1 / (100 - performance_2050_public) * performance_2050_public)) * 5 / 3), // 8365
  'public_2050_bike_max': emiss(co2_perday_model_high * multiplier_public, co2_perday_model_high * multiplier_public * (1 + (1 / (100 - performance_2050_public) * performance_2050_public)) * 5 / 3), // 22308

  'bike_2050_car_min':    emiss(co2_perday_model_low, co2_perday_model_low  * (1 + (1 / (100 - performance_2050_car) * performance_2050_car)) * 5), // 4950
  'bike_2050_car_max':    emiss(co2_perday_model_high, co2_perday_model_high * (1 + (1 / (100 - performance_2050_car) * performance_2050_car)) * 5), // 13200
  'bike_2050_public_min': emiss(co2_perday_model_low * multiplier_public, co2_perday_model_low * multiplier_public * (1 + (1 / (100 - performance_2050_public) * performance_2050_public)) * 5), // 23666
  'bike_2050_public_max': emiss(co2_perday_model_high * multiplier_public, co2_perday_model_high * multiplier_public * (1 + (1 / (100 - performance_2050_public) * performance_2050_public)) * 5) // 66924
};

// use for production data
// export const sets = {
//   'car': [[],['car_2020'], ['car_2050_min', 'car_2050_max'], ['public_2050_min', 'public_2050_max'], ['car_2050_bike_min', 'car_2050_bike_max']],
//   'car_mf': [[],['car_mf_2020'], ['car_mf_2050_min', 'car_mf_2050_max'], ['public_2050_min', 'public_2050_max'], ['car_mf_2050_bike_min', 'car_mf_2050_bike_max']],
//   'ecar': [[],['ecar_2020'], ['ecar_2050_min', 'ecar_2050_max'], ['public_2050_min', 'public_2050_max'], ['ecar_2050_bike_min', 'ecar_2050_bike_max']],
//   'public': [[],['public_2020'], ['public_2050_min', 'public_2050_max'], ['car_2050_min', 'car_2050_max'], ['public_2050_bike_min', 'public_2050_bike_max']],
//   'bike': [[],['car_2020'], ['car_2050_min', 'car_2050_max'], ['bike_2050_car_min', 'bike_2050_car_max'], ['bike_2050_public_min', 'bike_2050_public_max']]
// };

// for local data
export const sets = {
  'car': [[],['car_2020'], ['car_2050_min', 'car_2050_max'], ['car_2050_bike_min', 'car_2050_bike_max'], []],
  'car_mf': [[],['car_mf_2020'], ['car_mf_2050_min', 'car_mf_2050_max'], ['car_mf_2050_bike_min', 'car_mf_2050_bike_max'], []],
  'ecar': [[],['ecar_2020'], ['ecar_2050_min', 'ecar_2050_max'], ['ecar_2050_bike_min', 'ecar_2050_bike_max']],
  'public': [[],['public_2020'], ['public_2050_min', 'public_2050_max'], ['public_2050_bike_min', 'public_2050_bike_max'], []],
  'bike': [[],['car_2020'], ['car_2050_min', 'car_2050_max'], ['bike_2050_car_min', 'bike_2050_car_max'], ['bike_2050_public_min', 'bike_2050_public_max']]
};