import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthTestUtils, AuthTestResult } from '../utils/authTest';

const AuthTestScreen: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<AuthTestResult[]>([]);

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      const results = await AuthTestUtils.runCompleteTest();
      setTestResults(results);
      
      const allPassed = results.every(result => result.success);
      
      Alert.alert(
        'Test Results',
        allPassed 
          ? 'All authentication tests passed! ✅' 
          : 'Some tests failed. Check the results below. ❌',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Test Error',
        'Failed to run tests: ' + (error as Error).message,
        [{ text: 'OK' }]
      );
    } finally {
      setIsRunning(false);
    }
  };

  const renderTestResult = (result: AuthTestResult, index: number) => {
    return (
      <View key={index} style={[styles.resultCard, result.success ? styles.successCard : styles.errorCard]}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultIcon}>{result.success ? '✅' : '❌'}</Text>
          <Text style={[styles.resultMessage, result.success ? styles.successText : styles.errorText]}>
            {result.message}
          </Text>
        </View>
        {result.details && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Details:</Text>
            <Text style={styles.detailsText}>
              {typeof result.details === 'string' 
                ? result.details 
                : JSON.stringify(result.details, null, 2)}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Authentication Test Suite</Text>
        <Text style={styles.subtitle}>Test login, logout, and token validation</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.testButton, isRunning && styles.testButtonDisabled]}
          onPress={runTests}
          disabled={isRunning}
        >
          {isRunning ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.testButtonText}>Run Authentication Tests</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {testResults.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Test Results</Text>
            <Text style={styles.resultsCount}>
              {testResults.filter(r => r.success).length} / {testResults.length} passed
            </Text>
          </View>
        )}
        
        {testResults.map((result, index) => renderTestResult(result, index))}
        
        {testResults.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summaryText}>
              {testResults.every(r => r.success) 
                ? 'All authentication features are working correctly! 🎉'
                : 'Some authentication features need attention. Please check the failed tests above.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  buttonContainer: {
    padding: 20,
  },
  testButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  testButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  resultsCount: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  successCard: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  errorCard: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  resultMessage: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  successText: {
    color: '#059669',
  },
  errorText: {
    color: '#dc2626',
  },
  detailsContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
});

export default AuthTestScreen;