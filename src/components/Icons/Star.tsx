import { SVGProps } from 'react'

export const StarOutline = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.89 5.54344L8.25605 5.14385L6.445 0.877258L4.63396 5.15029L0 5.54344L3.51897 8.59192L2.46199 13.1228L6.445 10.7188L10.428 13.1228L9.37747 8.59192L12.89 5.54344ZM6.445 9.51356L4.02168 10.9766L4.66618 8.21811L2.52644 6.36195L5.34935 6.11704L6.445 3.51971L7.5471 6.12349L10.37 6.3684L8.23027 8.22456L8.87477 10.983L6.445 9.51356Z"
        fill="#fecd57"
      />
    </svg>
  )
}

export function StarFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="#fecd57"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z"
      ></path>
    </svg>
  )
}
