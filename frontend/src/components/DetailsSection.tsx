import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchBackend } from "../utils";

interface Review {
    id: string;
    author: string;
    author_details: {
        avatar_path: string; // image URL
        rating: number | null;
    };
    content: string;
    created_at: string; // ISO date
}

interface Props {
    filmId: number;
}

const DetailsSection = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await fetchBackend<Review[]>({ path: `/film/${props.filmId}/reviews` });
            if (response.success) {
                setReviews(response.body);
            } else {
                alert('Ein Fehler ist aufgetreten!'); // TODO: localization
            }
            setIsLoading(false);
        })();
    }, [props.filmId]);

    if (isLoading) {
        return "Loading...";
    }

    return (
        <Container>
            {reviews.length === 0 && "Keine Reviews vorhanden" /* TODO: localization */}
            {reviews.map(review => (
                <ReviewCard key={review.id}>
                    <div style={{ gridArea: "name" }}><b>{review.author}</b> • <small>{new Date(review.created_at).toDateString()}</small></div>
                    {review.author_details.rating && <div style={{ gridArea: "rating" }}>{review.author_details.rating}/10</div>}
                    {review.author_details.avatar_path
                        ? <img class="pic" style={{ gridArea: "pic" }} src={`https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`} />
                        : <div class="pic" style={{ gridArea: "pic" }}>?</div>}
                    <div style={{ gridArea: "content" }}>{review.content}</div>
                </ReviewCard>
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const ReviewCard = styled.div`
    display: grid;
    gap: .5em;
    align-items: center;
    grid-template:
        "pic     name"
        "rating  rating"
        "content content"
        / auto   1fr
    ;

    & > .pic {
        width: 2em;
        height: 2em;
        border: 1px solid white;
        border-radius: 50%;

        font-size: x-large;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default DetailsSection;
