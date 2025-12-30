import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Layout, Spinner } from '@ui-kitten/components'

export const LoadingScreen = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner status="primery" size='large' />
        </Layout>
    )
}
