import * as React from 'react';
import { ScrollView, Image } from 'react-native';
import { Text, View } from '../../components/Themed/Themed';
import { useNavigation } from '@react-navigation/native';
import DButton from '../../components/DButton';
import Dialog from "react-native-dialog";
import { useTheme } from 'react-native-paper';
import DTextInput from '../../components/DTextInput';
import { FormReducersProps, formConnector } from '../../redux/actions/actions';
import  { styles } from './styles';

const CheckboxForm = (props: FormReducersProps) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [formValue, setformValue] = React.useState({
    id: '',
    order: 0,
    type: 'checkBox',
    title: '',
    value: '',
    required: false,
    validator: () => {},
    validatorMsg: '',
  });
  const [isValidated, setIsValidated] = React.useState(true);
  const [errorText, setErrorText] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const handleForm = (index: string, value: string, isValidate: boolean) => {
    setformValue({
      ...formValue,
      title: value
    });
    setIsValidated(isValidate);
  }

  const submitForm = () => {

    if ( !isValidated ) {
      setVisible(true);
      setErrorText( 'Please check all forms are entered correctly');
      return;
    }

    props.addItems(formValue);
    navigation.goBack();
  }


  const headerText = 'A checkbox is shown as a square box that is ticked (checked) when activated. So Checked?!';
  return (
    <View style={{...styles.container, ...{backgroundColor: colors.primary}}}>

      <View style={{...styles.headerContainer, ...{backgroundColor: colors.primary}}}>
        <View style={{...styles.imageContainer, ...{backgroundColor: colors.primary}}}>
          <Image source={require('../../assets/images/vectors/checkbox.png')} style={styles.imageStyle} />
        </View>
        <View style={{ paddingHorizontal: 20, backgroundColor: colors.primary,  flexShrink: 1}}>
          <Text style={styles.title}>
            Checkbox
          </Text>
          <Text style={styles.subTitle}>
            {headerText}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.inputForm}>
          <DTextInput 
            title={"Title"} 
            value={formValue.title} 
            onFormUpdate={handleForm}
            validator={ (value: string) => { const letters = new RegExp('^[a-zA-Z0-9 ]+$'); return String(value).length > 0 && letters.test(value) }}
            validatorMessage={"Field must be not empty or contains special symbol"}
          /> 
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <DButton 
          title="Add" 
          type={'contrast'} 
          isDisabled={!isValidated}
          onPress={ () => submitForm()}/>
      </View>


      <Dialog.Container visible={visible}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description>
          {errorText}
        </Dialog.Description>
        <Dialog.Button label="Okay" onPress={() => { setVisible(false); }} />
      </Dialog.Container>

    </View>
    );
}

export default formConnector(CheckboxForm);