import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSubmitContact, useGetSiteSettings } from "@workspace/api-client-react";
import { useColors } from "@/hooks/useColors";

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: settings } = useGetSiteSettings();

  const { mutate: submitContact, isPending } = useSubmitContact({
    mutation: {
      onSuccess: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      },
      onError: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(
          "Send Failed",
          "Unable to send your message. Please try again.",
          [{ text: "OK" }]
        );
      },
    },
  });

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert("Missing Fields", "Please fill in all required fields.", [
        { text: "OK" },
      ]);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.", [
        { text: "OK" },
      ]);
      return;
    }
    submitContact({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingTop: isWeb ? 67 + 16 : insets.top + 16,
      paddingHorizontal: 16,
      paddingBottom: isWeb ? 34 + 100 : 100,
    },
    header: {
      marginBottom: 24,
    },
    headerLabel: {
      fontSize: 12,
      fontWeight: "600" as const,
      letterSpacing: 2,
      color: colors.primary,
      fontFamily: "Inter_600SemiBold",
      marginBottom: 6,
      textTransform: "uppercase",
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
    },
    infoCard: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 20,
      gap: 12,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    infoIconWrap: {
      width: 36,
      height: 36,
      borderRadius: colors.radius,
      backgroundColor: colors.primary + "18",
      alignItems: "center",
      justifyContent: "center",
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
    },
    formCard: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      gap: 14,
    },
    formTitle: {
      fontSize: 16,
      fontWeight: "600" as const,
      color: colors.foreground,
      fontFamily: "Inter_600SemiBold",
      marginBottom: 2,
    },
    label: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: "Inter_500Medium",
      fontWeight: "500" as const,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    input: {
      backgroundColor: colors.input,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
    },
    textArea: {
      height: 120,
      textAlignVertical: "top",
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: colors.radius,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
      marginTop: 4,
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      fontSize: 15,
      fontWeight: "600" as const,
      color: colors.primaryForeground,
      fontFamily: "Inter_600SemiBold",
    },
    successCard: {
      backgroundColor: colors.primary + "18",
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.primary + "40",
      padding: 24,
      alignItems: "center",
      gap: 12,
      marginTop: 16,
    },
    successTitle: {
      fontSize: 18,
      fontWeight: "700" as const,
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
      textAlign: "center",
    },
    successText: {
      fontSize: 14,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      textAlign: "center",
      lineHeight: 20,
    },
    sendAnotherBtn: {
      marginTop: 4,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sendAnotherText: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: "Inter_500Medium",
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
      >
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Get In Touch</Text>
          <Text style={styles.headerTitle}>Contact Us</Text>
        </View>

        {settings && (
          <View style={styles.infoCard}>
            {settings.phone1 && (
              <View style={styles.infoRow}>
                <View style={styles.infoIconWrap}>
                  <Feather name="phone" size={16} color={colors.primary} />
                </View>
                <Text style={styles.infoText}>{settings.phone1}</Text>
              </View>
            )}
            {settings.phone2 && (
              <View style={styles.infoRow}>
                <View style={styles.infoIconWrap}>
                  <Feather name="phone" size={16} color={colors.primary} />
                </View>
                <Text style={styles.infoText}>{settings.phone2}</Text>
              </View>
            )}
            {settings.contactEmail && (
              <View style={styles.infoRow}>
                <View style={styles.infoIconWrap}>
                  <Feather name="mail" size={16} color={colors.primary} />
                </View>
                <Text style={styles.infoText}>{settings.contactEmail}</Text>
              </View>
            )}
            {settings.address && (
              <View style={styles.infoRow}>
                <View style={styles.infoIconWrap}>
                  <Feather name="map-pin" size={16} color={colors.primary} />
                </View>
                <Text style={styles.infoText}>{settings.address}</Text>
              </View>
            )}
          </View>
        )}

        {submitted ? (
          <View style={styles.successCard}>
            <Feather name="check-circle" size={40} color={colors.primary} />
            <Text style={styles.successTitle}>Message Sent!</Text>
            <Text style={styles.successText}>
              Thank you for reaching out. Our team will get back to you within
              24 hours.
            </Text>
            <Pressable
              style={styles.sendAnotherBtn}
              onPress={() => setSubmitted(false)}
            >
              <Text style={styles.sendAnotherText}>Send Another Message</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Send a Message</Text>

            <View>
              <Text style={styles.label}>Name</Text>
              <TextInput
                testID="contact-name"
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor={colors.mutedForeground}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                testID="contact-email"
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={colors.mutedForeground}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            <View>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                testID="contact-subject"
                style={styles.input}
                placeholder="How can we help?"
                placeholderTextColor={colors.mutedForeground}
                value={subject}
                onChangeText={setSubject}
                returnKeyType="next"
              />
            </View>

            <View>
              <Text style={styles.label}>Message</Text>
              <TextInput
                testID="contact-message"
                style={[styles.input, styles.textArea]}
                placeholder="Describe your project or inquiry..."
                placeholderTextColor={colors.mutedForeground}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                returnKeyType="done"
              />
            </View>

            <Pressable
              testID="contact-submit"
              style={({ pressed }) => [
                styles.submitButton,
                (isPending || pressed) && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator size="small" color={colors.primaryForeground} />
              ) : (
                <>
                  <Feather name="send" size={16} color={colors.primaryForeground} />
                  <Text style={styles.submitButtonText}>Send Message</Text>
                </>
              )}
            </Pressable>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
