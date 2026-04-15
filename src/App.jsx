import { useState } from "react";
import CommentBox from "./components/CommentBox";

const commentData = [
  {
    id: 1,
    message: "Hello world! How are you?",
    children: [
      {
        id: 2,
        message: "Hey, I am fine, wau?",
        children: []
      }
    ]
  }
];

console.log(commentData);

const App = () => {
  const [allComments, setAllComments] = useState(commentData);
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  }

  const handleAddComment = () => {
    if (inputValue.trim() === "") return;

    const newComment = {
      id: crypto.randomUUID(),
      message: inputValue,
      children: []
    };

    setAllComments((prev) => [...prev, newComment]);
    setInputValue("");
  }

  const handleReply = (parentId, replyMessage) => {
    const addReplyToComment = (comments) => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            children: [
              ...comment.children,
              {
                id: crypto.randomUUID(),
                message: replyMessage,
                children: []
              }
            ]
          };
        }

        if (comment.children.length > 0) {
          return {
            ...comment,
            children: addReplyToComment(comment.children)
          };
        }

        return comment;
      });
    };

    setAllComments((prevComments) => addReplyToComment(prevComments));
  }

  return (
    <div className="mt-10 mx-10">
      <h1 className="text-2xl font-semibold pb-4">Comments</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Add comment..."
          className="outline-1 px-2 py-1"
          value={inputValue}
          onChange={handleInputValue}
        />
        <button className="bg-gray-100 outline-1 outline-black px-4 py-1 cursor-pointer" onClick={handleAddComment} >Add</button>
      </div>

      {/* comments show area  */}
      {
        allComments.length &&
        allComments.map((item) => {
          return <CommentBox key={item.id} data={item} depth={0} onReply={handleReply} />
        })
      }
    </div>
  )
}

export default App