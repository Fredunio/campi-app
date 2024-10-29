import { IonButton, IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

export default function FormPreviewImages({
  images,
  removeImage,
}: {
  images: string[] | undefined;
  removeImage: (index: number) => void;
}) {
  if (!images || images.length === 0 || !images[0]) {
    return null;
  }

  return (
    <div>
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={image}
            alt="preview"
            className="object-cover rounded-[4px]"
          />
          <IonButton
            fill="clear"
            color="danger"
            size="default"
            shape="round"
            className="absolute top-0 right-0"
            onClick={() => removeImage(index)}
          >
            <IonIcon
              slot="icon-only"
              icon={closeCircle}
              className="w-10 h-10"
            />
          </IonButton>
        </div>
      ))}
    </div>
  );
}
