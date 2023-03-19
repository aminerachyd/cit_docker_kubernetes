use actix_web::{HttpResponse, Responder};

fn cpu_expensive() -> u32 {
    let mut dividors = 0;
    for number in 0..100_000 {
        for div in 2..number {
            if number % div == 0 {
                // Not prime
                dividors += 1;
            } else {
                // Prime
            }
        }
    }
    dividors
}

pub async fn stress_test() -> impl Responder {
    let result = cpu_expensive();

    HttpResponse::Ok().json(result)
}
