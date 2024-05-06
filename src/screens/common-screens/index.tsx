import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../routes/routes';
import {
  ContactCard,
  CustomText,
  Gradient,
  ScreenWrapper,
} from '../../components';
import AppColors from '../../utills/Colors';
import Header from '../../components/header';
import styles from './styles';
import {View} from 'react-native';
import {Contact, MicroPhone, Phone, VisitUs} from '../../assets/svg';
import {FontFamily} from '../../utills/FontFamily';
import {CommonStyles} from '../../utills/CommonStyle';

const ContactUs = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.CONTACT_US>) => {
  return (
    <Gradient>
      <ScreenWrapper
        barStyle="light-content"
        transclucent
        statusBarColor={AppColors.transparent}
        scrollEnabled={true}
        headerUnScrollable={() => (
          <Header
            title="Contact Us  "
            containerStyle={styles.header}
            textColor={AppColors.white}
            iconColor={AppColors.white}
            onPress={() => navigation.goBack()}
          />
        )}>
        <View style={styles.mainContainer}>
          <Contact />
          <View style={styles.bottomContainer}>
            <CustomText
              color={AppColors.white}
              center
              font={FontFamily.appFontMedium}
              letterSpacing={0.2}
              textStyles={CommonStyles.marginVertical_5}>
              Contact us any time and from any where. We are ready to help you
              for your problems.
            </CustomText>
            <ContactCard
              title={'Contact us'}
              showVerticalLine={true}
              Icon={<Phone height={20} width={20} />}
              onPress={
                () => console.log('')

                // openBrowser('mailto:info@nationaltransferregistry.com')
              }
            />
            <ContactCard
              showVerticalLine={true}
              title={'Visit us '}
              Icon={<VisitUs height={20} width={20} />}
              onPress={
                () => console.log('')
                // openBrowser('https://nationaltransferregistry-com.webflow.io/')
              }
            />
            <ContactCard
              title={'Leave us a voice comment '}
              Icon={<MicroPhone height={20} width={20} />}
              onPress={
                () => () => console.log('')
                //  openBrowser('tel:608-432-5232')
              }
            />
          </View>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
};
export default ContactUs;
