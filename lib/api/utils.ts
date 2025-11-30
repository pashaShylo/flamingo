import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import { auth } from '@/lib/auth';
import { ERROR_MESSAGES } from '@/lib/constants/ui.constants';
import { ZodError } from 'zod';

/**
 * Standard API response structure
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
};

/**
 * Error types for better error handling
 */
export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Success response helper
 */
export function successResponse<T>(
  data: T,
  statusCode: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: statusCode }
  );
}

/**
 * Error response helper with proper logging
 */
export function errorResponse(
  error: unknown,
  context: string
): NextResponse<ApiResponse> {
  console.error(`[API Error - ${context}]:`, error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errorMessage = error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 400 }
    );
  }

  // Handle custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: error.statusCode }
    );
  }

  // Handle generic errors
  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }

  // Unknown error
  return NextResponse.json(
    {
      success: false,
      error: 'An unexpected error occurred',
    },
    { status: 500 }
  );
}

/**
 * Authentication middleware for API routes
 * Returns the session or throws UnauthorizedError
 */
export async function requireAuth(): Promise<Session> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  return session;
}

/**
 * Parse and validate JSON body from request
 */
export async function parseRequestBody<T>(
  request: NextRequest,
  schema: { parse: (data: unknown) => T }
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    }
    throw new ValidationError('Invalid request body');
  }
}

/**
 * Route handler wrapper with error handling
 * Automatically catches errors and returns proper error responses
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>,
  context: string
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return errorResponse(error, context);
    }
  };
}
