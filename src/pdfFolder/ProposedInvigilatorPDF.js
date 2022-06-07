import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: 16,
    paddingHorizontal: 40,
    paddingBottom: 56,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  headerImage: {
    alignSelf: "center",
    height: "150px",
    width: "50vw",
  },
  text: {
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
  },
  // row: {
  //   display: "flex",
  //   "flex-wrap": "wrap",
  //   // "margin-right": "-15px",
  //   // "margin-left": "-15px",
  // },
  // col: {
  //   "flex-basis": 0,
  //   "flex-grow": 1,
  //   "max-width": "100%",
  // },
  // col: {
  //   float: left,
  // width: 50%,
  // padding: 10px,
  // height: 300px;
  // }
});

const pageStyle = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56,
};

const tableStyle = {
  display: "table",
  width: "auto",
};

const tableRowStyle = {
  flexDirection: "row",
};

const firstTableColHeaderStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd",
};

const tableColHeaderStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd",
};
const tableColHeaderStyleCandidate = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#D4F1F4",
  color: "#FF0000",
};

const firstTableColStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
};

const tableColStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
};
const tableColStyleCandidate = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
  color: "#FF0000",
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 12,
  fontWeight: "bold",
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: 10,
};

const headerImageUrl =
  "https://res.cloudinary.com/dtqoaflek/image/upload/v1652369243/jpnj_k8nsb8.jpg";

// Create Document Component
const ProposedInvigilatorPDF = ({
  currentSelectedTeacherList,
  selectedExamCenter,
  schoolInformation,
  examTitle,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.section}>
          <Image src={headerImageUrl} style={styles.headerImage} />
        </View> */}

        <View style={styles.section}>
          <Text style={styles.header}>
            Proposed Invigilator Report Exam Center {selectedExamCenter} for{" "}
            {examTitle}
          </Text>
        </View>
        <View style={[styles.section]}>
          <Text style={[styles.text]}>
            School Code: {schoolInformation.schoolCode}
          </Text>
          <Text style={[styles.text]}>
            School Name: {schoolInformation.schoolName}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            {"\u00A0"}
            {"\u00A0"}
            {"\u00A0"}
            {"\u00A0"}
            Proposed Invigilator Report for {examTitle} of School{" "}
            {schoolInformation.schoolName}. This report includes the detial
            information of the teacher proposed and hiss or her invigilator
            position selected for the {examTitle}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Table 1: List of Invigilator Proposed</Text>
        </View>

        <View style={tableStyle}>
          <View style={tableRowStyle} fixed>
            <View style={firstTableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Name</Text>
            </View>

            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Ic Number</Text>
            </View>

            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Phone Number</Text>
            </View>
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Gender</Text>
            </View>
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Address</Text>
            </View>
            <View style={tableColHeaderStyleCandidate}>
              <Text style={tableCellHeaderStyle}>Position Proposed</Text>
            </View>
          </View>

          {currentSelectedTeacherList.map((teacher) => (
            <View style={tableRowStyle}>
              <View style={firstTableColStyle}>
                <Text style={tableCellStyle}>{teacher.teacherName}</Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>{teacher.icNumber}</Text>
              </View>

              <View></View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>{teacher.teacherPhoneNumber}</Text>
              </View>
              <View style={firstTableColStyle}>
                <Text style={tableCellStyle}>{teacher.teacherSex}</Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>
                  {teacher.homeAddress} {teacher.postcode} {teacher.city}
                </Text>
              </View>

              <View style={tableColStyleCandidate}>
                <Text style={tableCellStyle}>{teacher.position}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ProposedInvigilatorPDF;
