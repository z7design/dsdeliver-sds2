import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ScrollView, Text, View, Alert, Linking } from 'react-native';
import Header from '../Header';
import { Order } from '../types';
import OrderCard from '../OrderCard';
import { RectButton } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';

type Props = {
    route: {
      params: {
        order: Order;
      }
    }
  }
  

function OrdersDatails({ route }: Props) {
  const { order } = route.params;
  const navigation = useNavigation();

    const handleOnCancel = () => {
        navigation.navigate('Orders');
  }

  const  hendleConfirmDelivery = () => {
    confirmDelivery(order.id)
    .then(() => {
        Alert.alert(`Pedido ${order.id} confirmado com sucesso`);
        navigation.navigate('Orders');
    })
    .catch(() => {
        Alert.alert(`Erro ao confirmar o Pedido $S{order.id}`);
    })
  }

  const handStartNavigation = () => {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`);
  }
  return (
    <>
        <Header />
        <ScrollView style={styles.container}>
            <OrderCard order={order} />
            <RectButton style={styles.button}>
                <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={hendleConfirmDelivery}>
                <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={handleOnCancel}>
                <Text style={styles.buttonText}>CANCELAR</Text>
            </RectButton>
        </ScrollView>
    </>

  );
}

const styles = StyleSheet.create(
    {
        container: {
          paddingRight: '5%',
          paddingLeft: '5%'
        },
        button: {
          backgroundColor: '#DA5C5C',
          flexDirection: 'row',
          borderRadius: 10,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonText: {
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 50,
          paddingRight: 50,
          fontWeight: 'bold',
          fontSize: 18,
          color: '#FFF',
          letterSpacing: -0.24,
          fontFamily: 'OpenSans_700Bold'
        }
      }
);

export default OrdersDatails;