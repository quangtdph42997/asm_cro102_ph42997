import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

const QandA = (props) => {
  const [buoc1Expanded, setBuoc1Expanded] = useState(false);
  const [buoc2Expanded, setBuoc2Expanded] = useState(false);
  const [buoc3Expanded, setBuoc3Expanded] = useState(false);
  const [buoc4Expanded, setBuoc4Expanded] = useState(false);
  const [buoc5Expanded, setBuoc5Expanded] = useState(false);

  const handleExpandBuoc1 = () => {
    setBuoc1Expanded(!buoc1Expanded);
  };
  const handleExpandBuoc2 = () => {
    setBuoc2Expanded(!buoc2Expanded);
  };
  const handleExpandBuoc3 = () => {
    setBuoc3Expanded(!buoc3Expanded);
  };
  const handleExpandBuoc4 = () => {
    setBuoc4Expanded(!buoc4Expanded);
  };
  const handleExpandBuoc5 = () => {
    setBuoc5Expanded(!buoc5Expanded);
  };
  return (
    <ScrollView style={styles.conner}>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image style={{ width: 35, height: 35 }} source={require('../Img/chevron-left.png')} /></TouchableOpacity>
        <Text style={{ textAlign: 'center', fontSize: 23, color: 'black', fontWeight: '400', marginLeft: 130 }}>Q & A</Text>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 20 }}>
        <Text style={[styles.txt1, { width: '95%' }]}>Tôi trộn các chất dinh dưỡng theo thứ tự nào?</Text>
        <TouchableOpacity onPress={handleExpandBuoc1}>
          <Image style={{ alignSelf: 'center' }} source={require('../Img/chevron-up.png')} />
        </TouchableOpacity>
      </View>
      {buoc1Expanded && (
        <View>
          <ScrollView style={{ marginHorizontal: 60 }}>
            <Text style={styles.buocContent}>A, B, C, D,F rồi line E Root Igniter. Nên pha vào xô và cho máy sục oxy vào thì khơi pha dd sẽ tan đều.</Text>
          </ScrollView>
        </View>
      )}


      <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 20 }}>
        <Text style={[styles.txt1, { width: '95%' }]}>Tôi có thể giữ dung dịch dinh dưỡng hỗn hợp trong bao lâu?</Text>
        <TouchableOpacity onPress={handleExpandBuoc2}>
          <Image style={{ alignSelf: 'center' }} source={require('../Img/chevron-up.png')} />
        </TouchableOpacity>
      </View>
      {buoc2Expanded && (
        <View>
          <Text style={{ marginHorizontal: 60 }}>Dinh dưỡng cao cấp nên ko có hạn sử dụng,
            chỉ cần bảo quản tốt dưới nhiệt độ mát,
            tránh ánh sáng trực tiếp là sẽ để được rất lâu,
            Để duy trì mức dinh dưỡng tối ưu, chúng tôi khuyên bạn nên thay đổi hồ chứa thuỷ canh của bạn sau mỗi 7 ngày, còn với thổ canh thì pha lần nào tưới lần đó, thừa thì bỏ lần sau pha mới. Đặc biệt có vi sinh Mycorrhizae có hạn sử dụng sau 2 năm kể từ ngày mua.</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 20 }}>
        <Text style={[styles.txt1, { width: '95%' }]}>Khi nào tôi thêm bộ điều chỉnh pH?</Text>
        <TouchableOpacity onPress={handleExpandBuoc3}>

          <Image style={{ alignSelf: 'center' }} source={require('../Img/chevron-up.png')} />
        </TouchableOpacity>
      </View>

      {buoc3Expanded && (
        <View>
          <Text style={{ marginHorizontal: 60 }}>Sau khi bạn thêm A-F nhưng trước khi bạn thêm line E Root Igniter vào thì phải căn chỉnh pH trước rồi.
            PH tối ưu là giữa 5,8-6,3, nấm rễ phát triển tốt hơn khi pH chuẩn, dinh dưỡng đủ.
            Bạn cần thêm 1 số công cụ bút đo nữa nhé.</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 20 }}>
        <Text style={[styles.txt1, { width: '95%' }]}>Các chất điều chỉnh tăng trưởng có được sử dụng trong các sản phẩm Planta không?</Text>
        <TouchableOpacity onPress={handleExpandBuoc4}>
          <Image style={{ alignSelf: 'center' }} source={require('../Img/chevron-up.png')} />
        </TouchableOpacity>
      </View>

      {buoc4Expanded && (
        <View>
          <Text style={{ marginHorizontal: 60 }}>Không. Chúng tôi không sử dụng bất kỳ chất điều chỉnh tăng trưởng nào trong dòng Nutrient của mình.
            Điều này bao gồm Paclobutrazol và Daminozide, được chứng minh là có ảnh hưởng tiêu cực đến sức khỏe khi con người ăn phải, đặc biệt là Ung Thư.</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 20 }}>
        <Text style={[styles.txt1, { width: '95%' }]}>Các sản phẩm Planta có phải là hữu cơ không?</Text>
        <TouchableOpacity onPress={handleExpandBuoc5}>
          <Image style={{ alignSelf: 'center' }} source={require('../Img/chevron-up.png')} />
        </TouchableOpacity>
      </View>

      {buoc5Expanded && (
        <View>
          <Text style={{ marginHorizontal: 60 }}>Các sản phẩm dinh dưỡng của chúng tôi là sự pha trộn của tất cả các thành phần hữu cơ và vô cơ tự nhiên, không chứa hormone, nước hoa, thuốc nhuộm hoặc chất điều hòa tăng trưởng.
            Chúng đã được thiết kế đặc biệt để tối đa hóa khả dụng sinh học của các chất dinh dưỡng để hấp thụ và hiệu quả tối ưu. Chúng tôi hiểu được sự hấp thụ của một khu vườn hữu cơ. Quan trọng hơn, độ chính xác như vậy mang lại kết quả vượt trội với một giải pháp hoàn toàn hữu cơ.
            Chúng tôi tiếp tục phát triển các sản phẩm hữu cơ để thử nghiệm và sẽ cung cấp cho các thị trường dựa trên những kết quả chúng tôi thu thập được .</Text>
        </View>
      )}
    </ScrollView>
  )
}

export default QandA

const styles = StyleSheet.create({
  conner: {
    marginHorizontal: 30,
    marginBottom: 10
  },
  txt1: {
    fontSize: 17,
    marginVertical: 10,
    color: 'black'
  }, txt2: {
    fontSize: 17,
    marginTop: 50,
  }
})