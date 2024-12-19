export default function SvgBg({ boxW, boxH }: { boxW: number; boxH: number }) {
  const boxR = 30;
  return (
    <svg
      width={boxW}
      height={boxH}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="rounded-polygon">
          <path
            stroke="black"
            fill="transparent"
            d={`
                m ${boxR},0
                h ${boxW - boxR * 2}
                a 30,30 0 0 1 30,30
                v ${boxH * 0.75 - boxR * 2}
                a 30,30 0 0 1 -30,30
                h -${boxW * 0.5 - boxR * 2}
                a 30,30 45 0 0 -30,30
                v ${boxH * 0.25 - boxR * 2}
                a 30,30 0 0 1 -30,30
                h -${boxW * 0.5 - boxR * 2}
                a 30,30 0 0 1 -30,-30
                v -${boxH - boxR * 2}
                a 30,30 0 0 1 30,-30
              `}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
