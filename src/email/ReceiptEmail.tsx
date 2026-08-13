import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface ReceiptEmailProps {
  orderId: string,
  parsedItems: {
    name: string,
    price: number
  }[]
}

export default function ReceiptEmail({orderId, parsedItems}: ReceiptEmailProps) {
  const formatPrice = (price: number) => `$ ${(price / 100).toFixed(2)}`
  return (
    <Html>
      <Head />
      <Preview>Your order has been successfully paid!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for order! 🥐</Heading>

          <Section style={orderInfo}>
            <Text style={orderIdText}>
              <strong>ID заказа:</strong> {orderId}
            </Text>
          </Section>

          <Hr style={divider} />

          <Heading as="h3" style={h3}>Order details:</Heading>

          <Section>
            {parsedItems.map((item, index) => (
              <Section key={index} style={itemRow}>
                <Text style={itemName}>{item.name}</Text>
                <Text style={itemPrice}>{formatPrice(item.price)}</Text>
              </Section>
            ))}
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            If you have any questions, simply reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const h1 = {
  color: '#2a2a2a',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0',
  margin: '30px 0',
};

const h3 = {
  color: '#2a2a2a',
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '16px',
};

const text = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '24px',
};

const orderInfo = {
  backgroundColor: '#f9f9f9',
  padding: '12px 20px',
  borderRadius: '8px',
  margin: '24px 0',
};

const orderIdText = {
  color: '#2a2a2a',
  fontSize: '14px',
  margin: '0',
};

const divider = {
  borderColor: '#e6e6e6',
  margin: '24px 0',
};

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
};

const itemName = {
  color: '#2a2a2a',
  fontSize: '15px',
  margin: '0',
};

const itemPrice = {
  color: '#2a2a2a',
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  marginTop: '32px',
};