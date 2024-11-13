import { useActionSheet } from '@expo/react-native-action-sheet';

const options = ['Ustaw jako główne', 'Usuń zdjęcie', 'Anuluj'];
const destructiveButtonIndex = 1;
const cancelButtonIndex = 2;

type Props = {
  deletePhoto: (index: number) => void;
  setAsDefault: (index: number) => void;
};

export const useImageAction = (props: Props) => {
  const { deletePhoto, setAsDefault } = props;
  const { showActionSheetWithOptions } = useActionSheet();

  const makeAction = (index: number) => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            setAsDefault(index);
            break;

          case destructiveButtonIndex:
            deletePhoto(index);
            break;

          case cancelButtonIndex:
            // Canceled
            break;
        }
      },
    );
  };

  return makeAction;
};
