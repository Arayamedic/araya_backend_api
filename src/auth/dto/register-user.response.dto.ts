import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthenticatedUserResponseDto {
  @ApiResponseProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2ODY2YzZkLWU2ODItNDU2OS1hNmJmLThlZWMxMmQ2MmMxZCIsImZpcnN0TmFtZSI6IktpbmdzbGV5IiwibGFzdE5hbWUiOiJDaHVrd3VlbWVrYSIsIm1pZGRsZU5hbWUiOm51bGwsIm5pY2tOYW1lIjpudWxsLCJyb2xlIjoidXNlciIsImVtYWlsIjoia2luZ3NsZXllbWVrYTMxQGdtYWlsLmNvbSIsImVtYWlsSXNWZXJpZmllZCI6ZmFsc2UsImdlbmRlciI6bnVsbCwiZG9iIjpudWxsLCJwaG9uZU51bWJlciI6IisyMzQ5MDEyNzEzNzM4IiwicGhvbmVOdW1iZXJJc1ZlcmlmaWVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNS0wMy0xNlQwOTo1Njo1MS4wNjZaIiwidXBkYXRlZEF0IjoiMjAyNS0wMy0xNlQwOTo1Njo1MS4wNjZaIiwiZGVsZXRlZEF0IjpudWxsLCJpYXQiOjE3NDIxMTkwMTEsImV4cCI6MTc0MjI5MTgxMX0.BvqC8KoKyDoI44vu9lw9mO230l9gUGundnsZn6h-VZg',
  })
  accessToken: string;

  @ApiResponseProperty({
    type: 'string',
    example: '2025-03-17T23:56:51.212Z',
  })
  expiresAt: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'User regisstration is Successful',
  })
  message: string;
}
