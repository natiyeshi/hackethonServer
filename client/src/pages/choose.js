import React from "react";
import comp from '../asset/comp.png'
import stud from '../asset/stud.png'
function Choose() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex ">
        <div className="grid  card bg-base-300 rounded-box place-items-center p-3 cursor-pointer active:scale-95 transition-transform ease-in-out duration-75">
          <img src={comp}/>
          <div className="text-4xl font-bold ">Join as Company</div>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="grid  card bg-base-300 rounded-box place-items-center p-3 cursor-pointer active:scale-95 transition-transform ease-in-out duration-75">
          <img src={stud}/>
          <div className="text-4xl font-bold ">Join as Student</div>
        </div>
      </div>
    </div>
  );
}

export default Choose;
