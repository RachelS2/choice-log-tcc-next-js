import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Link from "next/link";

interface ChangeEmailVerificationProps {
  username: string;
  verifyUrl: string;
}

interface ChangeEmailVerificationProps {
  username: string;
  newEmail: string;
  verifyUrl: string;
}

const ChangeEmailVerification = ({
  username,
  newEmail,
  verifyUrl,
}: ChangeEmailVerificationProps) => {
  return (
    <Html dir="ltr" lang="en">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
            <Section>
              <Text className="mt-0 mb-[16px] font-bold text-[24px] text-gray-900">
                Confirm your email change
              </Text>

              <Text className="mt-0 mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                Hi {username}, we received a request to change
                the email address associated with your ChoiceLog
                account to <strong>{newEmail}</strong>.
              </Text>

              <Text className="mt-0 mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                To authorize this change, please click the
                button below.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  className="box-border rounded-[6px] bg-blue-600 px-[32px] py-[12px] font-medium text-[16px] text-white no-underline"
                  href={verifyUrl}
                >
                  Confirm Email Change
                </Button>
              </Section>

              <Text className="mt-0 mb-[24px] break-all text-[14px] text-gray-600 leading-[20px]">
                If the button doesn't work, copy and paste
                this link into your browser:
                <br />
                <Link href={verifyUrl}>{verifyUrl}</Link>
              </Text>

              <Text className="mt-0 mb-[32px] text-[14px] text-gray-600 leading-[20px]">
                If you didn't request this change, you can
                safely ignore this email. Your current email
                address will remain unchanged.
              </Text>

              <Hr className="my-[24px] border-gray-200" />

              <Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
                Best regards,
                <br />
                ChoiceLog Team.
              </Text>
            </Section>
            <Section className="mt-[32px] border-gray-200 border-t pt-[24px]">
              <Text className="m-0 text-center text-[12px] text-gray-400 leading-[16px]">
                Choice Log
                <br />
                Made By Rachel Barino Silva as a Final Project (TCC) for a Information Systems Degree at Universidade Federal Fluminense (UFF)
                <br />
                Niterói, Rio de Janeiro - Brazil
              </Text>

              <Text className="m-0 mt-[8px] text-center text-[12px] text-gray-400 leading-[16px]">
                © 2026 Choice Log. All rights reserved.
              </Text>
            </Section>
            {/* Seu footer atual pode ser mantido aqui */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ChangeEmailVerification;