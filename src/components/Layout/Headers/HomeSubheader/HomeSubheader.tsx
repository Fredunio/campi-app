import { IonButtons, IonChip, isPlatform } from "@ionic/react";
import { TFeedType } from "@lib/types";
import { feedTypes } from "@lib/constants";
import clsx from "clsx";
import { useCallback, useRef, useState, useEffect } from "react";

const subheaders = [
  {
    title: "Locations",
    value: feedTypes.locations,
  },
  {
    title: "Events",
    value: feedTypes.events,
  },
  {
    title: "Trips",
    value: feedTypes.trips,
  },
  {
    title: "Posts",
    value: feedTypes.posts,
  },
  {
    title: "Journals",
    value: feedTypes.journals,
  },
  {
    title: "Equipments",
    value: feedTypes.equipments,
  },
  {
    title: "Campers",
    value: feedTypes.campers,
  },
];

export default function HomeSubheader({
  onChipClick,
  activeChip,
}: {
  onChipClick: (feedType: TFeedType) => void;
  activeChip: string;
}) {
  const isMobile = isPlatform("mobile");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseLeave = useCallback(() => setIsDragging(false), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [isDragging, startX, scrollLeft]
  );

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      if (element.scrollLeft >= element.scrollWidth / 2) {
        element.scrollLeft = 0;
      }
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={clsx(
        "sticky top-0 flex overflow-x-auto bg-transparent cursor-grab",
        isDragging ? "cursor-grabbing" : "",
        isMobile ? "no-scrollbar" : ""
      )}
      style={{ whiteSpace: "nowrap" }}
    >
      <IonButtons
        slot="start"
        className="items-center gap-2 px-2 py-2 select-none"
      >
        {[...subheaders, ...subheaders].map((subheader, index) => (
          <IonChip
            key={`${subheader.value}-${index}`}
            onClick={() => onChipClick(subheader.value)}
            id={subheader.value}
            className={clsx(
              "subheader__btn font-semibold flex-shrink-0",
              activeChip === subheader.value ? "subheader__btn--activated" : ""
            )}
          >
            {subheader.title}
          </IonChip>
        ))}
      </IonButtons>
    </div>
  );
}

// import { feedTypes } from "@/lib/constants";
// import { TFeedType } from "@/lib/types";
// import {
//   IonButton,
//   IonButtons,
//   IonChip,
//   IonHeader,
//   IonMenuButton,
//   IonTitle,
//   IonToolbar,
//   isPlatform,
// } from "@ionic/react";
// import clsx from "clsx";
// import { useCallback, useRef, useState } from "react";

// const subheaders = [
//   {
//     title: "Locations",
//     value: feedTypes.locations,
//   },
//   {
//     title: "Events",
//     value: feedTypes.events,
//   },
//   {
//     title: "Trips",
//     value: feedTypes.trips,
//   },
//   {
//     title: "Posts",
//     value: feedTypes.posts,
//   },
//   {
//     title: "Journals",
//     value: feedTypes.journals,
//   },
//   {
//     title: "Equipments",
//     value: feedTypes.equipments,
//   },
//   {
//     title: "Campers",
//     value: feedTypes.campers,
//   },
// ];

// export default function HomeSubheader({
//   onChipClick,
//   activeChip,
// }: {
//   onChipClick: (feedType: TFeedType) => void;
//   activeChip: string;
// }) {
//   const isMobile = isPlatform("mobile");
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   const handleMouseDown = useCallback((e: React.MouseEvent) => {
//     setIsDragging(true);
//     setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
//     setScrollLeft(scrollRef.current?.scrollLeft || 0);
//   }, []);

//   const handleMouseLeave = useCallback(() => setIsDragging(false), []);
//   const handleMouseUp = useCallback(() => setIsDragging(false), []);

//   const handleMouseMove = useCallback(
//     (e: React.MouseEvent) => {
//       if (!isDragging) return;
//       e.preventDefault();
//       const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
//       const walk = (x - startX) * 1.5; // scroll-fast multiplier
//       if (scrollRef.current) {
//         scrollRef.current.scrollLeft = scrollLeft - walk;
//       }
//     },
//     [isDragging, startX, scrollLeft]
//   );

//   return (
//     <div
//       ref={scrollRef}
//       onMouseDown={handleMouseDown}
//       onMouseLeave={handleMouseLeave}
//       onMouseUp={handleMouseUp}
//       onMouseMove={handleMouseMove}
//       className={clsx(
//         "sticky top-0 overflow-x-auto bg-transparent  cursor-grab",
//         isDragging ? "cursor-grabbing" : "",
//         isMobile ? "no-scrollbar" : ""
//       )}
//     >
//       {/* <IonToolbar className="bg-transparent"> */}
//       <IonButtons
//         slot="start"
//         className="items-center gap-2 px-2 py-2 select-none"
//       >
//         {subheaders.map((subheader) => (
//           <IonChip
//             key={subheader.value}
//             // fill="clear"
//             // size="small"
//             onClick={() => onChipClick(subheader.value)}
//             id={subheader.value}
//             className={clsx(
//               "subheader__btn font-semibold flex-shrink-0",
//               activeChip === subheader.value ? "subheader__btn--activated" : ""
//             )}
//           >
//             {subheader.title}
//           </IonChip>
//         ))}
//       </IonButtons>
//     </div>
//   );
// }
