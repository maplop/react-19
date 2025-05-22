import { TabProps } from "../App"

interface TabButtonProps {
  isSelected: boolean,
  onClick: () => void,
  label: string
}

export const TabButton = ({ isSelected, onClick, label }: TabButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: isSelected ? '#0172AD' : 'transparent',
        borderColor: isSelected ? '#0172AD' : 'transparent'
      }}
      onClick={onClick}
    >{label}</button>
  )
}
