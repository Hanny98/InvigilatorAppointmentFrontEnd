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
const ExamCenterInformationPDF = ({
  examCenterInformation,
  selectedExamCenter,
  schoolInformation,
  totalInvigilator,
  totalCandidate,
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
            Exam Center Information Eaxm Center {selectedExamCenter} for{" "}
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
            Exam Center Information Report for {examTitle} of School{" "}
            {schoolInformation.schoolName}. This report includes the detail of
            the exam center information, the hall and room available, total
            number of candidates sitting for the exam and invigilators required.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Table 1: Hall & Room Available of the Exam Center
          </Text>
        </View>

        <View style={tableStyle}>
          <View style={tableRowStyle} fixed>
            <View style={firstTableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Hall Candidate</Text>
            </View>

            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Room Candidate</Text>
            </View>

            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Special Room Candidate</Text>
            </View>
            <View style={tableColHeaderStyleCandidate}>
              <Text style={tableCellHeaderStyle}>
                Total Number of Candidates
              </Text>
            </View>
          </View>

          <View style={tableRowStyle}>
            <View style={firstTableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.hallCandidateNumber}
              </Text>
            </View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.roomCandidateNumber}
              </Text>
            </View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.specialRoomCandidateNumber}
              </Text>
            </View>
            <View style={tableColStyleCandidate}>
              <Text style={tableCellStyle}>{totalCandidate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Table 2: Number of Each Type Invigilator Required
          </Text>
        </View>

        <View style={tableStyle}>
          <View style={tableRowStyle} fixed>
            <View style={firstTableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>
                Environmental Supervisor Required
              </Text>
            </View>

            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>
                Chief Invigilator Required
              </Text>
            </View>

            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>
                Vice Chief Invigilator Required
              </Text>
            </View>
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Room Keeper Required</Text>
            </View>
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Invigilator Required</Text>
            </View>
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>
                Reserved Invigilator Required
              </Text>
            </View>
            <View style={tableColHeaderStyleCandidate}>
              <Text style={tableCellHeaderStyle}>
                Total Number of Invigilator Required
              </Text>
            </View>
          </View>

          <View style={tableRowStyle}>
            <View style={firstTableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.numberOfEnvironmentalSupervisorRequired}
              </Text>
            </View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.numberOfChiefInvigilatorRequired}
              </Text>
            </View>

            <View></View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.numberOfViceChiefInvigilatorRequired}
              </Text>
            </View>
            <View style={firstTableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.numberOfRoomKeeperRequired}
              </Text>
            </View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.numberOfInvigilatorRequired}
              </Text>
            </View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>
                {examCenterInformation.numberOfReservedInvigilatorRequired}
              </Text>
            </View>
            <View style={tableColStyleCandidate}>
              <Text style={tableCellStyle}>{totalInvigilator}</Text>
            </View>
          </View>
          {/* <View style={styles.section}>
            <Text style={styles.text}>
              Total Number of Invigilator Required:{" "}
              <Text style={[styles.text, { color: "#FF0000" }]}>
                {totalInvigilator}
              </Text>
            </Text>
          </View> */}
        </View>
      </Page>
    </Document>
  );
};

export default ExamCenterInformationPDF;
