interface VideoCardProps {
    title: string;
    price: string;
    imageUrl: string;
}
function VideoCard({ title, price, imageUrl }: VideoCardProps) {
    return (
        <div>
                <div className="card m-3">
                    <img className="card-img-top" src={imageUrl} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{price}</p>
                    </div>
                </div>
            </div>
    )
}
export default VideoCard;