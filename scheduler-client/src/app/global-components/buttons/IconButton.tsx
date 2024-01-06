export interface IconButtonProps {
  onClickCb: (data?:any) => void;
  SvgIcon: React.FC;
}

export const IconButton = ({ onClickCb, SvgIcon }: IconButtonProps) => (
  <button
    onClick={onClickCb}
    className="font-bold py-2  rounded inline-flex items-center"
  >
    <SvgIcon />
    <span></span>
  </button>
);
