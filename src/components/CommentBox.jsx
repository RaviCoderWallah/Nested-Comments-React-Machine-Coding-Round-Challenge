import { useState } from "react"
import UserIconImage from "../assets/free-user-icon-3296-thumb.png"

const CommentBox = ({data, depth, onReply, onDelete}) => {
    const [isReplyBoxShow, setIsReplyBoxShow] = useState(false);
    const [replyInputValue, setReplyInputValue] = useState("");

    // Handle cancel event trigger 
    const handleOnCancel = () => {
        setIsReplyBoxShow(false);
        setReplyInputValue("");
    }

    //Handle comment reply trigger
    const handleCommentReply = () => {
        setIsReplyBoxShow(true);
    }

    const handleReplyInputValue = (e) => {
        setReplyInputValue(e.target.value);
    }

    // Handle save reply
    const handleSaveButton = (parentId, replyText) => {
        if (replyText.trim() !== "") {
            onReply(parentId, replyText);
            setReplyInputValue("");
            setIsReplyBoxShow(false);
        }
    }

    const handleDelete = (id) => {
       onDelete(id);
    }

    return (
        <>
            <div className="my-6 bg-gray-100 max-w-full p-2 rounded-lg flex items-center gap-4 border-l-6 border-blue-500" style={{ marginLeft: depth * 40 }}>
                <img src={UserIconImage} alt={data.id} className="w-14" />
                <div className="flex flex-col gap-2">
                    <p className="text-lg">{data.message}</p>
                    {
                        !isReplyBoxShow &&
                        <div className="flex items-center gap-2">
                            <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded-sm" onClick={handleCommentReply}>Reply</button>
                            <button className="px-2 py-1  bg-red-700 text-white text-sm rounded-sm" onClick={() => handleDelete(data.id)}>Delete</button>
                        </div>
                    }
                    {
                        isReplyBoxShow &&
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="outline-1 text-sm p-1"
                                placeholder="Reply..."
                                value={replyInputValue}
                                onChange={handleReplyInputValue}
                            />
                            <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded-sm" onClick={() => handleSaveButton(data.id, replyInputValue)}>Save</button>
                            <button className="px-2 py-1 bg-black text-white text-sm rounded-sm" onClick={handleOnCancel}>Cancel</button>
                        </div>
                    }
                </div>
            </div>
            {
                data.children && data.children.length > 0 &&
                data.children.map((item) => {
                    return <CommentBox key={item.id} data={item} depth={depth + 1} onReply={onReply} onDelete={onDelete}/>
                })
            }
        </>
    )
}

export default CommentBox