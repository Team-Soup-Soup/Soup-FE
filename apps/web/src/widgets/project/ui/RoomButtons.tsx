import React from 'react';

import SketchRoom from '~/assets/images/project-menu-sketch.png';
import ChatRoom from '~/assets/images/project-menu-chat.png';

export default function RoomButtons() {
  return (
    <div className="w-41 h-menu-height flex flex-col gap-y-[10px]">
      <RoomButton name="그림방" icon={SketchRoom} />
      <RoomButton name="소통방" icon={ChatRoom} />
    </div>
  );
}

interface RoomButtonProp {
  name: string;
  icon: string;
}
function RoomButton({ name, icon }: RoomButtonProp) {
  return (
    <button className="border-main-board-border rounded-auth box-border flex flex-1 cursor-pointer flex-col items-center justify-center border-[1px] p-4">
      <img src={icon} alt={name} />
      <span className="text-light font-ligh text-md">{name}</span>
    </button>
  );
}
