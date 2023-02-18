import { useState, useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [addStory, setAddStory] = useState(false);
  const [story, setStory] = useState(null);
  const [file, setFile] = useState(null);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  //TODO Add story using react-query mutations and use upload function.
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
  };

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.username} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={() => setAddStory(true) }>+</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
          {addStory && 
            <>
            <label htmlFor="story">
              <span>Picture for story</span>
              <div className="imgContainer">
                <img
                  src={
                    story
                      ? URL.createObjectURL(story)
                      : "/upload/" + currentUser.username
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="story"
              style={{ display: "none" }}
              onChange={(e) => setStory(e.target.files[0])}
            />
            </>
          }
    </div>
  );
};

export default Stories;