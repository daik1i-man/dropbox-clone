import React from 'react'
import { BounceLoader } from 'react-spinners'

export default function LoaderComponent() {
    return (
        <div className="absolute top-[45%] left-[42%]">
            <BounceLoader size={150} color="#000" />
        </div>
    )
}

