import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview, Row,
  Section,
  Text,
  Column
} from '@react-email/components'
import * as React from 'react'
import {Tailwind} from '@react-email/tailwind';

interface ReceiptEmailProps {
  orderId: string,
  parsedItems: {
    name: string,
    price: number
  }[]
}

export function Email({orderId, parsedItems}: ReceiptEmailProps) {
  const formatPrice = (price: number) => `$ ${(price / 100).toFixed(2)}`
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Your order has been successfully paid!</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={h1}>Thank you for order! 🥐</Heading>

            <Section style={orderInfo}>
              <Text style={orderIdText}>
                <strong>Order Id:</strong>111 {orderId}
              </Text>
            </Section>

            <Hr style={divider} />

            <Heading as="h3" style={h3}>Order details:</Heading>

            {parsedItems?.map((item, index) => (
              <Section key={index}>
                <Row style={itemRow}>
                  <Column align="left">
                    <Text style={itemName}>{item.name}</Text>
                  </Column>
                  <Column align="right">
                    <Text style={itemPrice}>$ {formatPrice(item.price)}</Text>
                  </Column>
                </Row>
              </Section>
            ))}
            <Hr style={divider} />

            <Text style={footer}>
              If you have any questions, simply reply to this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Helvetica,sans-serif',
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
  padding: '5px',
  paddingBlock: '3px'
};

const itemName = {
  padding: '5px',
  margin: '0px',
  color: '#2a2a2a',
  fontSize: '18px',
  fontWeight: '500'
};

const itemPrice = {
  color: '#2a2a2a',
  fontSize: '18px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  padding: '5px',
  margin: '0px',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  marginTop: '32px',
};