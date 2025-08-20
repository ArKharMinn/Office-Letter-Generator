import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    textAlign: "right",
  },
  section: {
    marginBottom: 15,
  },
  fromTo: {
    marginBottom: 10,
  },
  subject: {
    marginBottom: 15,
    fontWeight: "bold",
  },
  body: {
    marginBottom: 30,
    textAlign: "justify",
  },
  signatureSection: {
    marginTop: 40,
    textAlign: "left",
  },
  signatureImage: {
    width: 200,
    height: 50,
    marginTop: 5,
  },
});

const Letter = ({ sender, recipient, subject, body, signature }) => (
  <Document>
    <Page style={styles.page}>
      {/* Date */}
      <View style={styles.header}>
        <Text>{new Date().toLocaleDateString()}</Text>
      </View>

      {/* Sender & Recipient */}
      <View style={styles.fromTo}>
        <Text>From: {sender}</Text>
      </View>
      <View style={styles.fromTo}>
        <Text>To: {recipient}</Text>
      </View>

      {/* Subject */}
      <View style={styles.subject}>
        <Text>Subject: {subject}</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text>{body}</Text>
      </View>

      {/* Signature */}
      {signature && (
        <View style={styles.signatureSection}>
          <Text>Signed,</Text>
          <Image style={styles.signatureImage} src={signature} />
        </View>
      )}
    </Page>
  </Document>
);

export default Letter;
