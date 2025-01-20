import React from "react";
import { Camera } from "lucide-react";
const EditProfilePage = () => {
  const imageRef = React.useRef(null);
  return (
    <section>
      <h1>EditProfilePage</h1>
      <div>
        <form action="">
          <input type="file" name="image" id="image" hidden ref={imageRef} />
          <Camera onClick={() => imageRef.current.click()} className=" cursor-pointer" />
        </form>
      </div>
    </section>
  );
};

export default EditProfilePage;
