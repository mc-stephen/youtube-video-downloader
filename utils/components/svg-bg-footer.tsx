export default function SvgBgFooter({
  boxW,
  boxH,
}: {
  boxW: number;
  boxH: number;
}) {
  const boxR = 30;
  return (
    <svg width={boxW} height={boxH} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="footer-clipped-path">
          <path
            stroke="black"
            fill="transparent"
            d={`
                  m ${boxR},0
                  h ${boxW * 0.6 - boxR * 2}
                  a 30,30 0 0 1 30,30
                  v ${boxH * 0.2 - boxR * 2}
                  a 30,30 0 0 0 30,30
                  h ${boxW * 0.4 - boxR * 2}
                  a 30,30 0 0 1 30,30
                  v ${boxH * 0.7 - boxR * 2}
                  a 30,30 0 0 1 -30,30
                  h -${boxW * 0.4 - boxR * 2}
                  a 30,30 0 0 0 -30,30
                  v ${boxH * 0.1 - boxR * 2}
                  a 30,30 0 0 1 -30,30
                  h -${boxW * 0.2 - boxR * 2}
                  a 30,30 0 0 1 -30,-30
                  v -${boxH * 0.1 - boxR * 2}
                  a 30,30 0 0 0 -30,-30
                  h -${boxW * 0.4 - boxR * 2}
                  a 30,30 0 0 1 -30,-30
                  v -${boxH * 0.9 - boxR * 2}
                  a 30,30 0 0 1 30,-30
                `}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
