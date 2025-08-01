import { useRef } from "react";
import { useKakaoRouteMap } from "../../hook/DeliveryMap/useKakaoRouteMap";
import './LiveMapComponent.css';

const LiveMapComponent = ({ currentPos, destination }) => {
    const mapRef = useRef(null);

    // 지도 생성 및 경로 표시 (커스텀 훅)
    useKakaoRouteMap(mapRef, currentPos, destination);

    return (
        <div
            ref={mapRef}
            style={{
                width: '100%',
                height: '100%',
                border: 'solid black 1px',
                position: 'relative',
            }}
        />
    );
};

export default LiveMapComponent;