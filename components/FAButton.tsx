import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {FAB as PaperFAB} from 'react-native-paper';

interface FabButtonProps {
  navigateToAddFlight: () => void;
}

const FabIcon: React.FC =  () => <Image source={require('../asset/image_5.png')} />

const FabButton: React.FC<FabButtonProps> = ({navigateToAddFlight}) => (
    <PaperFAB style={styles.button} icon={FabIcon} onPress={navigateToAddFlight} />
);

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default FabButton;
