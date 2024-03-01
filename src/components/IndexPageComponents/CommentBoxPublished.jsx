import useComments from "../../hooks/useComments";
import useCommentStorage from "../../hooks/useCommentsStore";

const CommentBoxPublished = () => {
  const { commentsPendings } = useComments();

  const pageComments = useCommentStorage((state) => state.comments);
  return (
    <>
      <h3 className="comment-box-published-title">
        Comentarios más recientes:
      </h3>
      <div className="comment-box-row">
        <div className="comment-box-published-container">
          {!commentsPendings &&
            pageComments.length > 0 &&
            pageComments.map((item) => (
              <article className="comment-box-published-card" key={item.date}>
                <div className="comment-box-published-card-text">
                  <h5>
                    Creador: {item.creator}{" "}
                    {item.rate === "recommended" ? (
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                    ) : (
                      <i className="bi bi-hand-thumbs-down-fill"></i>
                    )}
                  </h5>
                  <p>Descripcion: {item.comment}</p>
                </div>
                <div className="comment-box-published-card-date">
                  <span>
                    {new Date(parseInt(item.date)).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(parseInt(item.date)).toLocaleTimeString()}
                  </span>
                </div>
              </article>
            ))}
        </div>
        <div className="comment-box-rate-container">
          <h5 className="comment-box-rate-title">Calificaciones:</h5>
        </div>
      </div>
    </>
  );
};

export default CommentBoxPublished;
