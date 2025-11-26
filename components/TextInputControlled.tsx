import { textInputControlledStyle } from "@/styles/textInputControlled";
import { Control, useController } from "react-hook-form";
import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  name: string;
  control: Control<any>;
  label: string;
  style?: StyleProp<TextStyle>;
}

export default function TextInputControlled({ name, control, label, style }: Props) {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });

  return (
    <TextInput
      activeOutlineColor="#0070f8"
      style={[textInputControlledStyle.textInputStyle, style]}
      mode="outlined"
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      label={label}
    />
  );
}
