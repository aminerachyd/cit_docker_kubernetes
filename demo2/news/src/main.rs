// The API will be available at http://localhost:8000/news
mod news;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use news::news;

#[actix_web::main]
async fn main() {
    println!("Starting news server on port 8080");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .service(web::resource("/news").route(web::get().to(news)))
    })
    .bind("0.0.0.0:8080")
    .unwrap()
    .run()
    .await
    .unwrap();
}
