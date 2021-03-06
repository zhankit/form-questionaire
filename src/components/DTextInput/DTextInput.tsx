import React, { useEffect, useState } from 'react'
import { TextInput, Text, View } from 'react-native'
import PropTypes from 'prop-types';
import  { styles } from './styles';
import { Question } from '../../interfaces/interfaces';
interface DTextInputProps {
  id: string;
  index?: number;
  title: string;
  value: string;
  required?: boolean;
  onFormUpdate: Function;
  validator: Function;
  validatorMessage?: string;
  placeholder?: string;
}

const DTextInput = (props: DTextInputProps) =>  {
  
  const {id, title, index, required, value, placeholder, validator, validatorMessage, onFormUpdate} = props;

  const [textValue, setTextValue] = useState(value);
  const [isValidate, setIsValidate] = useState(true);
  const [backgroundColor, setbackgroundColor] = useState('black');

  useEffect( () => {
    setIsValidate(validator(textValue));
    onFormUpdate(id, textValue, isValidate);

  }, [textValue, isValidate])
  

  return(
    <View style={styles.ContainerStyle}>
      <Text style={styles.TextStyle}>{title}{ required? <Text style={{color : '#e00000'}}> *</Text>: ''} </Text> 
      <TextInput 
        key={id}
        value={textValue}
        onBlur={ () => setbackgroundColor('black') }
        onFocus={ () => setbackgroundColor('green') }
        onChangeText={(text) => { setTextValue(text)}}
        selectionColor={'blue'}
        style={{...styles.TextInputStyle, ...{ borderColor: backgroundColor}}}
        placeholder={placeholder} 
        />  
      { !isValidate && (<Text style={{color : '#e00000', paddingTop: 10}}> {validatorMessage} </Text>) }
    </View>    
  );

}

DTextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

DTextInput.defaultProps = {
  required: true,
  index: -1,
  validator: (value: any) => { return String(value).length > 0 },
  validatorMessage: 'Fields Must be filled'
};

export default DTextInput