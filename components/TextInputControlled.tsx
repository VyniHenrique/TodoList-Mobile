import { homeStyle } from "@/styles/home";
import { Control, useController } from "react-hook-form";
import { TextInput } from "react-native-paper";

interface Props {
  name: string;
  control: Control<any>;
  label: string;
}

export default function TextInputControlled({ name, control, label }: Props) {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });

  return (
    <TextInput
      activeOutlineColor="#0070f8"
      style={homeStyle.textInputStyle}
      mode="outlined"
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      label={label}
    />
  );
}
