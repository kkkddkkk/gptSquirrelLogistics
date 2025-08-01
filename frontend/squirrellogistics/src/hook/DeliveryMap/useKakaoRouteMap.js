import { useEffect } from "react";
import axios from "axios";

//카카오 맵 API용 자바스크립트 키 (지도 렌더링용).
const KAKAO_JAVASCRIPT_KEY = "b6fc5753806ea3c0eb775a731ba0376b";

//카카오 맵 API용 REST API 키 (경로 추출용).
const KAKAO_NAVIGATION_REST_KEY = "a9b27d11d11d4f05e7134f9de285845d";

//[useKakaoRouteMap가 필요한 프롭].

//mapRef: 지도 DOM 컨테이너 참조 값.
//currentPos: 현재 위치 값.
//currentPos: 종료 위치 값.
export const useKakaoRouteMap = (mapRef, currentPos, endPos) => {

    //currentPos,endPos 모니터링 + 변경 시 재랜더링.
    useEffect(() => {

        const drawRoute = async () => {

            const container = mapRef.current; //지도를 렌더링 대상.

            const options = {
                center: new window.kakao.maps.LatLng(currentPos.lat, currentPos.lng),
                level: 5, //확대 정도 5로 지정.
            };

            //지도 인스턴스 생성.
            const map = new window.kakao.maps.Map(container, options);

            //출발지, 도착지 마커 생성.
            const startMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(currentPos.lat, currentPos.lng),
                map,
            });

            const endMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(endPos.lat, endPos.lng),
                map,
            });

            //경보음처럼 움직이는 현위치 애니 출력 => div생성 후 CustomOverlay로 제작.
            //css 적용 후 키프레임으로 움직임 재생.
            const overlayDiv = document.createElement("div");
            overlayDiv.className = "live-map-pulse-circle";

            const customOverlay = new window.kakao.maps.CustomOverlay({
                content: overlayDiv,
                position: new window.kakao.maps.LatLng(currentPos.lat, currentPos.lng),
                //div중앙으로 맞춤.
                yAnchor: 0.5,
                xAnchor: 0.5,
                map,
            });

            //길찾기 API연결
            try {
                const res = await axios.get(
                    "https://apis-navi.kakaomobility.com/v1/directions",
                    {
                        headers: {
                            Authorization: `KakaoAK ${KAKAO_NAVIGATION_REST_KEY}`,
                        },
                        //시작점,도착점을 경도,위도 순서대로  넘겨줘야함.
                        params: {
                            origin: `${currentPos.lng},${currentPos.lat}`,
                            destination: `${endPos.lng},${endPos.lat}`,
                        },
                    }
                );


                //응답으로 경로정보 == 버택스(경,위,경,위 ....) 일렬 반환.
                //폴리라인 그릴 수 있는 형태로 경로 가공.
                const linePath = res.data.routes[0].sections[0].roads.flatMap((road) =>
                    road.vertexes.reduce((acc, cur, idx) => {
                        if (idx % 2 === 0) {
                            //위도,경도 순서대로 LatLng로 만들어 ACC에 저장, 그리고 리턴.
                            acc.push(
                                //짝수번째가 경, 홀수번째가 위 (헷갈림 유의).
                                new window.kakao.maps.LatLng(road.vertexes[idx + 1], cur)
                            );
                        }
                        return acc;
                    }, [])
                );

                //위에서 가공한 경로 정보, linePath 사용하여 붉은 실선 설정.
                const polyline = new window.kakao.maps.Polyline({
                    path: linePath,
                    strokeWeight: 5,
                    strokeColor: "#ff0000ff",
                    strokeOpacity: 0.9,
                    strokeStyle: "solid",
                });

                //지도에 선 출력.
                polyline.setMap(map);

                //출력할 지도 영역 값 생성.
                const bounds = new window.kakao.maps.LatLngBounds();
                //출력한 붉은 실선 경로 내 모든 좌표 추가 => 좌표 기준으로 지도영역 재맞춤.
                linePath.forEach((latlng) => bounds.extend(latlng));
                map.setBounds(bounds);


            } catch (err) {
                console.error("[ERROR!!!] 길찾기 실패: ", err);
            }
        };

        //SDK로딩 여부에 따른 동적 로드, 지도 그리기 시작.
        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps) {
                //이미 있다면 그리기 바로 실행.
                window.kakao.maps.load(drawRoute);
            } else {
                //로드 안 됐을 경우, script 태그로 SDK로드.
                const script = document.createElement("script");
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JAVASCRIPT_KEY}&autoload=false`;
                script.async = true;

                //로딩 완료 후 그리기 시작.
                script.onload = () => window.kakao.maps.load(drawRoute);
                //<head>에 스크립트 삽입.
                document.head.appendChild(script);

                //정리(cleanup)용=> unmount시 script제거.
                return () => document.head.removeChild(script);
            }
        };

        //카카오 맵 SDK로딩 및 지도 그리기.
        loadKakaoMap();

    }, [mapRef, currentPos, endPos]); // 의존성 등록.
};
