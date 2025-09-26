import { truncate } from "../utils/format";

// a component to display an article card
// it shows the article image, title, source, published date, description, 
// and a link to read more

export default function ArticleCard({ article }) {
    // destructure the article object to get the relevant properties
    const {
        title,
        description,
        url,
        urlToImage, // article image
        source,
        publishedAt
    } = article ?? {}; // provide a default empty object if article is null or undefined

    return (
        // the main container for the article card
        <article className="card">
            <img 
            className="thumb"
            src={urlToImage ?? "https://via.placeholder.com/400x200?text=No+Image"}
            alt={title ?? "article image"}
            />
            <div className="card-body">
                <h2>{title ?? "No title available"}</h2>
                <p className="meta">
                    {source?.name ?? "Unkown sorce"} •{""}
                    {new Date(publishedAt ?? Date.now()).toLocaleDateString()}
                </p>

                <p>{truncate(description ?? "No description available", 100)}</p>
                <a href={url ?? "#"} target="_blank" rel="noreferrer">
                    {`Read more - ${source?.name ?? "source"}`}
                </a>
            </div>
        </article>
    );
}

// const API_KEY = "YOUR_NEWSAPI_KEY_HERE"; // Replace with your real key