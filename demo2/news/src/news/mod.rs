use std::env;

use actix_web::{HttpResponse, Responder};

#[derive(serde::Serialize, serde::Deserialize)]
struct New {
    id: i32,
    title: String,
    content: String,
}

#[derive(serde::Serialize)]
struct Response {
    hostname: String,
    news: Vec<New>,
}

fn generate_news(number: u32) -> Vec<New> {
    let mut news = Vec::new();
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
    tincidunt lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nulla
    facilisi. Donec auctor, nisl eget lacinia tincidunt, nisl nisl aliquam nisl, nec aliquam
    nisl nisl sit amet nisl. Nulla facilisi. Donec auctor, nisl eget lacinia tincidunt, nisl";

    for i in 0..number {
        news.push(New {
            id: i as i32,
            title: format!("Title {}", i),
            content: format!("Content {}: {}", i, content),
        });
    }
    news
}

pub async fn news() -> impl Responder {
    let news = generate_news(10);
    let hostname = env::var("HOSTNAME").unwrap();
    HttpResponse::Ok().json(Response { hostname, news })
}
