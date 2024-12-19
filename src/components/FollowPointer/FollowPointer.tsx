import { motion } from 'framer-motion';
import { stringToColor } from '@/lib/utils';

export default function FollowPointer({ 
  info,
  x,
  y
}: { 
  info: {
    name: string;
    email: string;
    avatar: string;
  };
  x: number;
  y: number
}) {
  const color = stringToColor(info.email || "1")
  console.log(info)

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill="none"
        strokeWidth="1"
        width="36"
        height="48"
        viewBox="0 0 24 36"
        className={`text-[${color}] transform -translate-x-
        [${x}px] -translate-y-[${y}px] stroke-[${color}]`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
      />
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap
        min-w-max text-xs rounded-full"
      >
        {info?.name || info?.email}
      </motion.div>
    </motion.div>
  )
}
