import React, { useEffect, useState } from 'react'
import { Text, View, Switch } from 'react-native'
import PropTypes from 'prop-types';
import  { styles } from './styles';
interface DToggleProps {
  id: string;
  title: string;
  value: any;
  required: boolean;
  validator: Function;
  onFormUpdate: Function;
  validatorMessage?: string;
  placeholder?: string;
}

const DToggle = (props: DToggleProps) =>  {
  
  const { id, title, required, value, placeholder, validator, validatorMessage, onFormUpdate} = props;

  const [toggleValue, settoggleValue] = useState(value);
  const [isValidate, setIsValidate] = useState(true);

  useEffect( () => {
    
    setIsValidate(validator(toggleValue));
    onFormUpdate(id, toggleValue, isValidate);

  }, [toggleValue, isValidate])
  
  return(
    <View style={styles.ContainerStyle}>
      <Switch 
        trackColor={{ false: "#767577", true: "#0D3B66" }}
        thumbColor={toggleValue ? "#FAF0CA" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        value={toggleValue}
        onValueChange={() => settoggleValue(!toggleValue)}
        />
      <View style={styles.textContainer}>
        <Text style={styles.TextStyle}>{title}</Text>
      </View>
    </View>    
  );

}

DToggle.propTypes = {
  title: PropTypes.string,
  value: PropTypes.bool,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.any
};

DToggle.defaultProps = {
  required: true,
  validator: () => {},
  validatorMessage: ''
};

export default DToggle