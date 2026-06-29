import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetSiteSettings, useListWorkers } from "@workspace/api-client-react";
import { useColors } from "@/hooks/useColors";

const STATS = [
  { value: "15+", label: "Active Vessels", icon: "ferry" as const },
  { value: "99.2%", label: "Safety Record", icon: "shield-check" as const },
  { value: "25+", label: "Years Experience", icon: "calendar-star" as const },
  { value: "3", label: "Global Regions", icon: "earth" as const },
];

const CAPABILITIES = [
  { icon: "rotate-3d-variant" as const, label: "Directional Drilling" },
  { icon: "pipe" as const, label: "Well Completion" },
  { icon: "magnify-scan" as const, label: "Subsea Inspection" },
  { icon: "wave" as const, label: "Pipeline & SURF" },
];

const PARTNERS = [
  "Equinor",
  "Schlumberger",
  "TechnipFMC",
  "Saipem",
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const { data: settings, isLoading: settingsLoading } = useGetSiteSettings();
  const { data: workers, isLoading: workersLoading } = useListWorkers();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingTop: isWeb ? 67 : insets.top,
      paddingBottom: isWeb ? 34 + 100 : 100,
    },
    hero: {
      paddingHorizontal: 16,
      paddingTop: 32,
      paddingBottom: 28,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    heroBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.primary + "18",
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.primary + "30",
      marginBottom: 16,
    },
    heroBadgeText: {
      fontSize: 11,
      fontWeight: "600" as const,
      color: colors.primary,
      fontFamily: "Inter_600SemiBold",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    heroTitle: {
      fontSize: 34,
      fontWeight: "700" as const,
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
      lineHeight: 40,
      marginBottom: 8,
    },
    heroAccent: {
      color: colors.primary,
    },
    heroSubtitle: {
      fontSize: 15,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      lineHeight: 22,
      marginBottom: 20,
    },
    heroDivider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    heroDividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    heroDividerText: {
      fontSize: 11,
      color: colors.mutedForeground,
      fontFamily: "Inter_500Medium",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    partnersRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    partnerChip: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: colors.radius,
      backgroundColor: colors.muted,
      borderWidth: 1,
      borderColor: colors.border,
    },
    partnerText: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: "Inter_500Medium",
    },
    section: {
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 8,
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: "600" as const,
      letterSpacing: 2,
      color: colors.primary,
      fontFamily: "Inter_600SemiBold",
      marginBottom: 4,
      textTransform: "uppercase",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700" as const,
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
      marginBottom: 16,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    statCard: {
      width: "47%",
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      alignItems: "center",
      gap: 6,
    },
    statValue: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: colors.primary,
      fontFamily: "Inter_700Bold",
    },
    statLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      textAlign: "center",
    },
    capGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    capCard: {
      width: "47%",
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    capLabel: {
      fontSize: 13,
      fontWeight: "500" as const,
      color: colors.foreground,
      fontFamily: "Inter_500Medium",
      flex: 1,
    },
    leaderCard: {
      marginHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      flexDirection: "row",
      gap: 14,
      alignItems: "center",
      marginBottom: 8,
    },
    leaderAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.muted,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    leaderAvatarImg: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    leaderInfo: {
      flex: 1,
    },
    leaderTitle: {
      fontSize: 11,
      color: colors.primary,
      fontFamily: "Inter_600SemiBold",
      fontWeight: "600" as const,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 3,
    },
    leaderName: {
      fontSize: 17,
      fontWeight: "700" as const,
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
      marginBottom: 3,
    },
    leaderQuote: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      fontStyle: "italic",
      lineHeight: 16,
    },
    crewSection: {
      marginTop: 8,
    },
    crewLoading: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      alignItems: "center",
    },
    crewList: {
      paddingHorizontal: 16,
      gap: 8,
    },
    crewCard: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    crewAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + "20",
      alignItems: "center",
      justifyContent: "center",
    },
    crewInfo: {
      flex: 1,
    },
    crewName: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: colors.foreground,
      fontFamily: "Inter_600SemiBold",
    },
    crewRole: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      marginTop: 1,
    },
    crewPhone: {
      fontSize: 12,
      color: colors.primary,
      fontFamily: "Inter_400Regular",
    },
    emptyState: {
      paddingVertical: 32,
      alignItems: "center",
      gap: 8,
    },
    emptyText: {
      fontSize: 14,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <MaterialCommunityIcons name="oil" size={11} color={colors.primary} />
            <Text style={styles.heroBadgeText}>Offshore Specialists</Text>
          </View>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroAccent}>NorthWave</Text>
            {"\n"}Energy Drilling
          </Text>
          <Text style={styles.heroSubtitle}>
            Relentless pursuit of operational perfection in the world's harshest
            offshore environments.
          </Text>
          <View style={styles.heroDivider}>
            <View style={styles.heroDividerLine} />
            <Text style={styles.heroDividerText}>Trusted By</Text>
            <View style={styles.heroDividerLine} />
          </View>
          <View style={styles.partnersRow}>
            {PARTNERS.map((p) => (
              <View key={p} style={styles.partnerChip}>
                <Text style={styles.partnerText}>{p}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>By the Numbers</Text>
          <Text style={styles.sectionTitle}>Track Record</Text>
        </View>
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <MaterialCommunityIcons
                name={stat.icon}
                size={24}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Capabilities */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Core Services</Text>
          <Text style={styles.sectionTitle}>Capabilities</Text>
        </View>
        <View style={styles.capGrid}>
          {CAPABILITIES.map((cap) => (
            <View key={cap.label} style={styles.capCard}>
              <MaterialCommunityIcons
                name={cap.icon}
                size={20}
                color={colors.primary}
              />
              <Text style={styles.capLabel}>{cap.label}</Text>
            </View>
          ))}
        </View>

        {/* Leadership */}
        {settingsLoading ? null : settings ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Leadership</Text>
              <Text style={styles.sectionTitle}>Our Founder</Text>
            </View>
            <View style={styles.leaderCard}>
              <View style={styles.leaderAvatar}>
                {settings.ceoPhotoUrl ? (
                  <Image
                    source={{ uri: settings.ceoPhotoUrl }}
                    style={styles.leaderAvatarImg}
                  />
                ) : (
                  <Feather name="user" size={28} color={colors.primary} />
                )}
              </View>
              <View style={styles.leaderInfo}>
                <Text style={styles.leaderTitle}>Chief Executive Officer</Text>
                <Text style={styles.leaderName}>{settings.ceoName}</Text>
                <Text style={styles.leaderQuote}>
                  "Forged in steel. Proven at sea."
                </Text>
              </View>
            </View>
          </>
        ) : null}

        {/* Crew Roster */}
        <View style={[styles.section, styles.crewSection]}>
          <Text style={styles.sectionLabel}>Our People</Text>
          <Text style={styles.sectionTitle}>Expert Crew</Text>
        </View>

        {workersLoading ? (
          <View style={styles.crewLoading}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : workers && workers.length > 0 ? (
          <View style={styles.crewList}>
            {workers.slice(0, 5).map((worker) => (
              <View key={worker.id} style={styles.crewCard}>
                <View style={styles.crewAvatar}>
                  <Feather name="user" size={18} color={colors.primary} />
                </View>
                <View style={styles.crewInfo}>
                  <Text style={styles.crewName}>{worker.name}</Text>
                  {worker.role ? (
                    <Text style={styles.crewRole}>{worker.role}</Text>
                  ) : null}
                </View>
                <Text style={styles.crewPhone}>{worker.phone}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Feather name="users" size={28} color={colors.mutedForeground} />
            <Text style={styles.emptyText}>No crew listed yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
