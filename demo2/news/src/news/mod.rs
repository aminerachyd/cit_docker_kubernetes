use actix_web::{HttpResponse, Responder};

#[derive(serde::Serialize, serde::Deserialize)]
struct New {
    id: i32,
    title: String,
    content: String,
}

fn generate_news(number: u32) -> Vec<New> {
    let mut news = Vec::new();
    // 3 lines of content
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
    HttpResponse::Ok().json(news)
}
