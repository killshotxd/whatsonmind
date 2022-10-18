/* eslint-disable */

import moment from "moment/moment";

export default function Message({
  children,
  avatar,
  userName,
  description,
  timeStamp,
  time,
}) {
  // var timeStamp = {
  //   nanoseconds: "" || timeStamp?.nanoseconds,
  //   seconds: "" || timeStamp?.seconds,
  // };

  const formattedTime = new Date(
    timeStamp?.seconds * 1000 + timeStamp?.nanoseconds / 100000
  ).toUTCString();

  // var moments = new Date(timeStamp?.toDate())?.toUTCString();

  // const time = moment.utc(moments)?.startOf("hour")?.fromNow();

  const times = moment(formattedTime)?.startOf("hour").fromNow();

  return (
    <div className="bg-white p-8 border-b-2 rounded-lg mt-2 border-cyan-200">
      <div className="flex items-center gap-2">
        <img src={avatar} className="w-10 rounded-full" alt="avatar" />
        <h2>{userName}</h2>
        <p className="text-sm ma">{times === "Invalid date" ? "" : times}</p>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
