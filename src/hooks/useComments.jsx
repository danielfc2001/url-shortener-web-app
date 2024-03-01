import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getLatestComments } from "../services/comments";
import useCommentStorage from "./useCommentsStore";
import { SOCKET_HOSTNAME } from "../env/externalsUrls";

const socket = io(SOCKET_HOSTNAME);

const useComments = () => {
  const [commentsPendings, setCommentPendings] = useState(false);
  const setAllComments = useCommentStorage((state) => state.setAllComments);
  const setNewComment = useCommentStorage((state) => state.createNewComment);

  useEffect(() => {
    socket.on("result_create_comment", setNewComment);
    return () => socket.off("result_create_comment");
  });

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      setCommentPendings(true);
      const response = await getLatestComments();
      if (!response)
        throw new Error("A ocurrido un error al procesar la solicitud.");
      setAllComments(response);
    } catch (error) {
      console.log(error);
    } finally {
      setCommentPendings(false);
    }
  };

  const createNewComment = (comment) => {
    socket.emit("create_comment", comment);
    setNewComment({
      creator: comment.creator,
      comment: comment.comment,
      rate: comment.rate,
      date: new Date().getTime().toString(),
    });
    return () => socket.off("create_comment");
  };
  return { commentsPendings, createNewComment };
};

export default useComments;
